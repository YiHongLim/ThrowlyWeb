import React, { useState } from 'react';
import './ChatbotPage.css';

interface Listing {
  id: string;
  title: string;
  price?: number;
  imageUrl?: string;
}

interface SearchResponse {
  success: boolean;
  data: {
    listings: Listing[];
  };
  error?: string;
}

const ChatbotPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Array<{id: number, text: string, isUser: boolean, data?: any}>>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ q: query, limit: "5" });
      const response = await fetch(
        `https://us-central1-gutter-bc42f.cloudfunctions.net/apiSearchByTitle?${params}`
      );
      const data: SearchResponse = await response.json();
      return data;
    } catch (err: any) {
      console.error('Search error:', err);
      return { success: false, data: { listings: [] }, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const userMessage = {
        id: Date.now(),
        text: inputValue,
        isUser: true
      };
      setMessages(prev => [...prev, userMessage]);
      const query = inputValue.trim();
      setInputValue('');
      
      // Perform search
      const searchResults = await handleSearch(query);
      
      // Add bot response with search results
      const botResponse = {
        id: Date.now() + 1,
        text: searchResults.success 
          ? `Found ${searchResults.data.listings.length} results for "${query}"`
          : `Search failed: ${searchResults.error || 'Unknown error'}`,
        isUser: false,
        data: searchResults
      };
      setMessages(prev => [...prev, botResponse]);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Main Content */}
      <div className="chatbot-main">
        {messages.length === 0 ? (
          <div className="welcome-section">
            <h2 className="welcome-title">Throwly AI - Your AI Shopping Assistant</h2>
          </div>
        ) : (
          <div className="messages-container">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}>
                <div className="message-content">
                  {message.text}
                  {message.data && (
                    <div className="search-results">
                      <h4 className="results-title">Search Results:</h4>
                      <div className="listings-grid">
                        {message.data.data?.listings?.map((item: Listing) => (
                          <div key={item.id} className="listing-item">
                            <h5 className="listing-title">{item.title}</h5>
                            {item.price && <p className="listing-price">${item.price}</p>}
                            {item.imageUrl && (
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="listing-image"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="json-response">

                        <pre className="json-content">
                          {JSON.stringify(message.data, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="input-form">
          <div className="input-container">
            <button type="button" className="attach-btn">
              <span className="plus-icon">+</span>
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="furniture, electronics, free items"
              className="message-input"
            />
            <div className="input-actions">
              <button type="submit" disabled={loading} className="send-btn">
                {loading ? "..." : "→"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatbotPage;
