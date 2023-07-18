import React from "react";

interface CardProps {
  id: { value: string };
  name: { first: string; last: string; title: string };
  gender: string;
  email: string;
}

const Card: React.FC<CardProps> = ({ id, name, gender, email }) => {
  return (
    <div
      key={id.value}
      className="bg-gray-200 rounded-lg shadow-md p-6 border border-4 border-indigo-200 border-y-indigo-500"
    >
      <h2 className="text-2xl font-bold mb-4">
        {name.title} {name.first} {name.last}
      </h2>
      <p className="text-black-200">Gender: {gender}</p>
      <p className="text-black-200">Email: {email}</p>
    </div>
  );
};

export default Card;
