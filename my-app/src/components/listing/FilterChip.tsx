

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
                    cursor: "pointer",
                    fontSize: 12,
                    padding: 0,
                }}
            >
                Clear all
            </button>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {items.map((chip) => (
                    <div
                        className="rounded-full"
                        key={chip.id}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "2px 10px",
                            background: "rgb(0,0,0)",
                            color: "rgb(255, 255, 255)",
                            fontSize: 12,
                            border: "1px solid rgb(0, 0, 0)",
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
                                color: "rgb(255, 255, 255)",
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