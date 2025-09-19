import React from "react";
import { Row, Col, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchBar: React.FC = () => {
  return (
    <div
      style={{
        borderBottom: "1px solid #eee",
        padding: "16px 40px",
        backgroundColor: "#fff",
      }}
    >
      <Row gutter={16} align="middle">
        {/* Location Dropdown */}
        <Col flex="200px">
          <Button block>Story County ▼</Button>
        </Col>

        {/* Search Input */}
        <Col flex="auto">
          <Input
            placeholder="What are you looking for?"
            suffix={<SearchOutlined />}
            style={{ borderRadius: "6px" }}
          />
        </Col>
      </Row>

      {/* Popular Keywords */}
      <Row
        style={{
          marginTop: "8px",
          gap: "16px",
          fontSize: "14px",
          color: "#555",
        }}
      >
        {[
          "Popular",
          "ikea",
          "lululemon",
          "playstation",
          "patagonia",
          "yeti cooler",
          "xbox",
          "nintendo switch",
          "samsung",
          "sofa",
          "dresser",
          "iphone",
          "coffee table",
          "tv",
          "couch",
          "free",
          "desk",
        ].map((word) => (
          <span key={word} style={{ cursor: "pointer" }}>
            {word}
          </span>
        ))}
      </Row>
    </div>
  );
};

export default SearchBar;
