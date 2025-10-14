import React from "react";

type Chip = { id: string; label: string };

export function FilterChips({
    items,
    onRemove,
    onClearAll,
}: {
    items: Chip[];
    onRemove: (id: string) => void;
    onClearAll: () => void;
}) {
    if (!items?.length) return null;

    return (
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button
                onClick={onClearAll}
                style={{
                    background: "transparent",
                    border: "none",
                    color: "#9aa0a6",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontSize: 16,
                    padding: 0,
                }}
            >
                Clear all
            </button>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {items.map((chip) => (
                    <div
                        key={chip.id}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "5px 10px",
                            background: "#e9eaee",
                            color: "#111",
                            borderRadius: 999,
                            fontSize: 15,
                            border: "1px solid #cfd2d7",
                        }}
                    >
                        <span>{chip.label}</span>
                        <button
                            aria-label={`Remove ${chip.label}`}
                            onClick={() => onRemove(chip.id)}
                            style={{
                                width: 22,
                                height: 22,
                                borderRadius: "50%",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "none",
                                background: "transparent",
                                cursor: "pointer",
                                color: "#333",
                                fontSize: 10,
                                lineHeight: 1,
                            }}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}