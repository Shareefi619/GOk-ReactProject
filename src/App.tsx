import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Card from "./Card/Card";
import { CardProps } from "./Card/Card";

// interface Card {
//   id: { value: string };
//   name: { first: string; last: string; title: string };
//   gender: string;
//   email: string;
// }

const Page: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cards, setCards] = useState<CardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<{ results: CardProps[] }> = await axios.get(
          "https://randomuser.me/api/?results=50"
        );

        const responseNew = response.data.results.filter((fit) => fit.id.value);
        const filteredValues = responseNew.filter((value, index) => index < 20);
        //console.log(filteredValues);
        setCards(filteredValues);
        //setCards(response.data.results);
        //console.log(responseNew);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    void fetchData();
  }, []);

  return (
    <div>
      <header className="bg-gray-200 p-4">
        {/* Header content */}
        <h1 className="text-xl font-bold">My Page Header</h1>
      </header>

      <main className="p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div >
            {cards.map((card) => (
              
              // <div 
              //   key={card.id.value}
              //   className="bg-gray-200 rounded-lg shadow-md p-6 border border-4 border-indigo-200 border-y-indigo-500"
              // >
              //   {/* Card content */}
              //   <h2 className="text-2xl font-bold mb-4">{card.name.title} {card.name.first} {card.name.last}</h2>
              //   <p className="text-black-200">Gender: {card.gender}</p>
              //   <p className="text-black-200">Email: {card.email}</p>
              // </div>
              <Card  id = {card.id} name={card.name} gender={card.gender} email={card.gender}/>
            
            ))}
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-4 px-8">
        {/* Footer content */}
        <p>&copy; React First Application</p>
      </footer>
    </div>
  );
};

export default Page;
