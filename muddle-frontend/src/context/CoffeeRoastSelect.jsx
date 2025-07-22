import { useEffect, useState } from "react";
import api from "../api/api";

export default function CoffeeRoastSelect({ selectedRoast, onSelect }) {
  const [roasts, setRoasts] = useState([]);

  useEffect(() => {
    api.get("/profile/coffee-roasts").then((res) => {
      setRoasts(res.data);
    });
  }, []);

  return (
    <div className="space-y-2">
      {roasts.map((roast) => {
        const isSelected = roast.name === selectedRoast;

        return (
          <button
            key={roast.name}
            type="button"
            style={{
              backgroundColor: roast.hexColor,
              opacity: isSelected ? 1 : 0.9,
              border: isSelected ? "2px solid white" : "none",
            }}
            className="px-4 py-2 rounded text-white shadow-md w-full transition-all"
            onClick={() => onSelect(roast.name)}
          >
            {roast.displayName}
          </button>
        );
      })}
    </div>
  );
}
