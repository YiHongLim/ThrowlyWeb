import React, {useState} from "react";
import {Row, Col, Button, Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase";

type SearchBarProps = {
    onResults: (results: any[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({onResults}) => {
        const [listings, setListings] = useState([]);
        const [error, setError] = useState(false);
        const [message, setMessage] = useState("");
        const [searchValue, setSearchValue] = useState("");


        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchValue(e.target.value);
        };

        const performSearch = async (query: any) => {
            // Implement search functionality here
            if (!query) return onResults([]);

            setError(false);
            setMessage("");

            try {
                console.log("Performing search for:", query);
                const queryLowerCase = query.toLowerCase();

                // Get all documents from the "MYCollection" collection
                const listingsCollectionRef = collection(db, "MYCollection");
                const snapshot = await getDocs(listingsCollectionRef);

                if (snapshot.empty) {
                    setMessage("No items found in database");
                    setListings([]);
                    return;
                }

                // Filter documents client-side to find those containing the query string
                const filteredItems: any = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    if (data.title && data.title.toLowerCase().includes(queryLowerCase)) {
                        filteredItems.push({
                            id: doc.id,
                            ...data
                        });
                    }
                });

                console.log(`Found ${filteredItems.length} items for query: ${query}`);

                if (filteredItems.length === 0) {
                    setMessage("No matching items found");
                }

                onResults(filteredItems);
            } catch (error) {
                console.error("Search error:", error);
                setError(true);
                setMessage("An error occurred while searching");
                onResults([]);
            }
        }


        return (
            <div
                style={{
                    borderBottom: "1px solid #eee",
                    padding: "16px 40px",
                }}
            >
                <div className="flex justify-space-between gap-4">

                    <Input
                        placeholder="Search"
                        value={searchValue}
                        onChange={handleInputChange}
                        onPressEnter={() => performSearch(searchValue)}
                        style={{color: '#fc5c65'}}
                    ></Input>
                </div>

                {/* Popular Keywords */}
                {/*<Row*/}
                {/*  style={{*/}
                {/*    marginTop: "8px",*/}
                {/*    gap: "16px",*/}
                {/*    fontSize: "14px",*/}
                {/*    color: "#555",*/}
                {/*  }}*/}
                {/*>*/}
                {/*  {[*/}
                {/*    "Popular",*/}
                {/*    "ikea",*/}
                {/*    "lululemon",*/}
                {/*    "playstation",*/}
                {/*    "patagonia",*/}
                {/*    "yeti cooler",*/}
                {/*    "xbox",*/}
                {/*    "nintendo switch",*/}
                {/*    "samsung",*/}
                {/*    "sofa",*/}
                {/*    "dresser",*/}
                {/*    "iphone",*/}
                {/*    "coffee table",*/}
                {/*    "tv",*/}
                {/*    "couch",*/}
                {/*    "free",*/}
                {/*    "desk",*/}
                {/*  ].map((word) => (*/}
                {/*    <span key={word} style={{ cursor: "pointer" }}>*/}
                {/*      {word}*/}
                {/*    </span>*/}
                {/*  ))}*/}
                {/*</Row>*/}
            </div>
        );
    }
;

export default SearchBar;
