import { useState, useEffect, useCallback } from 'react';
import { User } from 'firebase/auth';
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  setDoc
} from 'firebase/firestore';
import { db } from '../../firebase';
import { AdminType, FeedbackType, ReportType, MYCollectionItemType } from '../../types';

export const useAdmin = (user: User | null) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<FeedbackType[]>([]);
  const [reports, setReports] = useState<ReportType[]>([]);

  // Robust check: tries multiple patterns so this works regardless of how Admin docs are shaped.
  useEffect(() => {
    let mounted = true;
    const checkAdminStatus = async () => {
      setLoading(true);
      setIsAdmin(false);

      if (!user) {
        if (mounted) setLoading(false);
        return;
      }

      try {
        const uid = user.uid;
        console.log('useAdmin: Checking admin for uid:', uid);

        // 1) Check Admin/<uid> (doc id is UID)
        const adminByUidRef = doc(db, 'Admin', uid);
        const adminByUidSnap = await getDoc(adminByUidRef);
        if (adminByUidSnap.exists()) {
          console.log('useAdmin: Found Admin doc by uid');
          if (mounted) setIsAdmin(true);
          return;
        }

        // 2) Get user doc to find username (if any)
        const userRef = doc(db, 'Users', uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.exists() ? userSnap.data() : null;
        const username = userData?.username;
        if (username) {
          const adminByUsernameRef = doc(db, 'Admin', String(username));
          const adminByUsernameSnap = await getDoc(adminByUsernameRef);
          if (adminByUsernameSnap.exists()) {
            console.log('useAdmin: Found Admin doc by username');
            if (mounted) setIsAdmin(true);
            return;
          }
        }

        // 3) Query Admin collection where common field names equal uid
        const adminsCol = collection(db, 'Admin');
        const fieldsToTry = ['UserId', 'userId', 'UserID', 'uid'];
        for (const field of fieldsToTry) {
          const q = query(adminsCol, where(field, '==', uid));
          const qSnap = await getDocs(q);
          if (!qSnap.empty) {
            console.log(`useAdmin: Found Admin by field ${field}`);
            if (mounted) setIsAdmin(true);
            return;
          }
        }

        // nothing matched
        if (mounted) setIsAdmin(false);
        console.log('useAdmin: No admin match found for this user');
        console.log('useAdmin: Debug info:', {
          uid,
          username,
          adminByUidExists: adminByUidSnap.exists(),
          adminByUsernameExists: username ? (await getDoc(doc(db, 'Admin', String(username)))).exists() : false
        });
      } catch (error) {
        console.error('useAdmin: Error checking admin status:', error);
        if (mounted) setIsAdmin(false);
      } finally {
        if (mounted) {
          setLoading(false);
          console.log('useAdmin: finished admin check, isAdmin=', isAdmin);
        }
      }
    };

    checkAdminStatus();

    return () => {
      mounted = false;
    };
  }, [user]);

  // Fetch feedback data
  const fetchFeedback = useCallback(async () => {
    try {
      const feedbackRef = collection(db, 'Feedback');
      const feedbackSnap = await getDocs(feedbackRef);
      const feedbackData = feedbackSnap.docs.map(d => ({ id: d.id, ...d.data() })) as FeedbackType[];
      setFeedback(feedbackData);
    } catch (error) {
      console.error('useAdmin: Error fetching feedback:', error);
    }
  }, []);

  // Fetch reports data
  const fetchReports = useCallback(async () => {
    try {
      const reportsRef = collection(db, 'Reports');
      const reportsSnap = await getDocs(reportsRef);
      const reportsData = reportsSnap.docs.map(d => ({ id: d.id, ...d.data() })) as ReportType[];
      setReports(reportsData);
    } catch (error) {
      console.error('useAdmin: Error fetching reports:', error);
    }
  }, []);

  // Add new admin (creates document id = userId; also store field UserId)
  const addAdmin = useCallback(async (userId: string) => {
    try {
      const adminRef = doc(db, 'Admin', userId);
      await setDoc(adminRef, { UserId: userId });
      console.log('useAdmin: Admin added:', userId);
      return { success: true };
    } catch (error) {
      console.error('useAdmin: Error adding admin:', error);
      return { success: false, error };
    }
  }, []);

  // Fetch user information by ID
  const fetchUserInfo = useCallback(async (userId: string) => {
    try {
      const userRef = doc(db, 'Users', userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        return userSnap.data();
      }
      return null;
    } catch (error) {
      console.error('useAdmin: Error fetching user info:', error);
      return null;
    }
  }, []);

  // Fetch item information by ID from MYCollection
  const fetchItemInfo = useCallback(async (itemId: string) => {
    try {
      const itemRef = doc(db, 'MYCollection', itemId);
      const itemSnap = await getDoc(itemRef);
      if (itemSnap.exists()) {
        return itemSnap.data();
      }
      return null;
    } catch (error) {
      console.error('useAdmin: Error fetching item info:', error);
      return null;
    }
  }, []);

  // Fetch current admins
  const fetchCurrentAdmins = useCallback(async () => {
    try {
      const adminsRef = collection(db, 'Admin');
      const adminsSnap = await getDocs(adminsRef);
      const adminDocs = adminsSnap.docs;
      
      // Get user info for each admin
      const adminPromises = adminDocs.map(async (adminDoc) => {
        const adminData = adminDoc.data();
        const userId = adminData.UserId || adminDoc.id;
        const userInfo = await fetchUserInfo(userId);
        return {
          id: adminDoc.id,
          userId: userId,
          userInfo: userInfo
        };
      });
      
      const adminsWithUserInfo = await Promise.all(adminPromises);
      return adminsWithUserInfo;
    } catch (error) {
      console.error('useAdmin: Error fetching current admins:', error);
      return [];
    }
  }, [fetchUserInfo]);

  // Utility functions for data processing
  const sortByDate = (items: any[], dateField: string) => {
    return [...items].sort((a, b) => {
      const dateA = a[dateField] ? (a[dateField].toDate ? a[dateField].toDate().getTime() : new Date(a[dateField]).getTime()) : 0;
      const dateB = b[dateField] ? (b[dateField].toDate ? b[dateField].toDate().getTime() : new Date(b[dateField]).getTime()) : 0;
      return dateB - dateA; // Newest first
    });
  };

  const formatDate = (date: any) => {
    if (!date) return 'N/A';
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString();
  };

  const getUserDisplayName = (user: any) => {
    return user ? (user.username || user.displayName || user.email || 'Unknown User') : 'Loading...';
  };

  const getUserEmail = (user: any, fallback: string) => {
    return user ? user.email : fallback;
  };

  const getReportStats = (reports: ReportType[]) => {
    const total = reports.length;
    const closed = reports.filter(r => r.status === 'RESOLVED' || r.status === 'DISMISSED').length;
    const open = reports.filter(r => r.status === 'REPORTED' || r.status === 'INVESTIGATING').length;
    return { total, closed, open };
  };

  const getStatusColor = (status: string) => {
    return status === 'RESOLVED' || status === 'DISMISSED' ? 'green' : 'red';
  };

  const getStatusText = (status: string) => {
    return status === 'RESOLVED' || status === 'DISMISSED' ? 'Closed' : 'Open';
  };

  // Styling constants for admin components
  const getInputStyles = () => ({
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #d9d9d9',
    borderRadius: '6px',
    marginTop: '4px'
  });

  const getButtonStyles = (loading: boolean) => ({
    backgroundColor: '#1890ff',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: loading ? 'not-allowed' : 'pointer',
    opacity: loading ? 0.6 : 1
  });

  // Styling constants
  const adminStyles = {
    card: {
      border: '1px solid #f0f0f0',
      borderRadius: '8px'
    },
    indexBadge: (color: string = '#1890ff') => ({
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      backgroundColor: color,
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: '14px',
      flexShrink: 0
    }),
    statCard: {
      textAlign: 'center' as const,
      minWidth: '120px'
    },
    statNumber: (color: string) => ({
      fontSize: '24px',
      fontWeight: 'bold',
      color
    }),
    statLabel: {
      fontSize: '12px',
      color: '#666'
    },
    userInfo: {
      fontSize: '14px',
      fontWeight: 'bold',
      marginBottom: '4px'
    },
    userEmail: {
      fontSize: '12px',
      color: '#666'
    },
    dateText: {
      fontSize: '12px',
      color: '#666',
      marginBottom: '4px'
    },
    descriptionText: {
      fontSize: '14px',
      lineHeight: '1.4'
    }
  };

  return {
    isAdmin,
    loading,
    feedback,
    reports,
    fetchFeedback,
    fetchReports,
    addAdmin,
    fetchUserInfo,
    fetchItemInfo,
    fetchCurrentAdmins,
    // Utility functions
    sortByDate,
    formatDate,
    getUserDisplayName,
    getUserEmail,
    getReportStats,
    getStatusColor,
    getStatusText,
    // Styling functions
    getInputStyles,
    getButtonStyles,
    // Styling constants
    adminStyles,
  };
};

