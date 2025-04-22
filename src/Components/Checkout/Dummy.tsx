import { useState } from "react";

const dummyAddresses = [
  {
    id: 1,
    name: "Home",
    address: "123, MG Road, Bengaluru, Karnataka",
  },
  {
    id: 2,
    name: "Work",
    address: "456, Indiranagar, Bengaluru, Karnataka",
  },
  {
    id: 3,
    name: "Other",
    address: "789, Koramangala, Bengaluru, Karnataka",
  },
];

export const AddressStepper = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Stepper */}
      <div className="w-1/4 bg-white border-r border-neutral-0 py-10 px-6">
        <div className="text-lg font-semibold mb-6">Checkout Steps</div>
        <ul className="space-y-6 text-sm">
          <li className="text-dark_orange font-medium">1. Select Address</li>
          <li className="text-gray-400">2. Payment</li>
          <li className="text-gray-400">3. Review</li>
        </ul>
      </div>

      {/* Address Selection */}
      <div className="w-3/4 p-10">
        <h2 className="text-xl font-semibold mb-6">
          Choose a Delivery Address
        </h2>
        <div className="space-y-4">
          {dummyAddresses.map((addr) => (
            <label
              key={addr.id}
              className={`flex items-start p-4 border rounded-lg cursor-pointer ${
                selectedId === addr.id
                  ? "border-dark_orange bg-orange-50"
                  : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="address"
                className="mt-1 mr-4 accent-dark_orange scale-125"
                checked={selectedId === addr.id}
                onChange={() => setSelectedId(addr.id)}
              />
              <div>
                <div className="font-medium text-neutral-50">{addr.name}</div>
                <div className="text-sm text-neutral-40">{addr.address}</div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
