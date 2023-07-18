import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Card from "./Card/Card";
import { CardProps } from "./Card/Card";

const Page: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState<CardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<{ results: CardProps[] }> =
          await axios.get("https://randomuser.me/api/?results=20");
        const filteredValues = response.data.results
          .filter((fit) => fit.id.value)
          .slice(0, 20);
        console.log(filteredValues);
        setCards(filteredValues);
        if (!response.status) {
          throw new Error("Data Not Found!");
        }
        setIsLoading(false);
      } catch (error) {
        const newError = error;
        console.log(newError);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchData();
  }, []);

  return (
    <div>
      <header className="flex justify-center bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">My React App!</h1>
      </header>

      <main>
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : null}

        {!isLoading && cards.length ? (
          <div>
            {cards.map((card) => (
              <Card
                id={card.id}
                name={card.name}
                gender={card.gender}
                email={card.email}
              />
            ))}
          </div>
        ) : (
          /** Condional: if the Api doesnot work or fetch the data  */
          <div className="flex justify-center h-full bg-red-400	text-white font-bold	">
            <span>Data not fetched from API.</span>
          </div>
        )}
      </main>

      <footer className=" flex justify-center bg-gray-800 text-white py-4 px-8">
        {/* Footer content */}
        <p>&copy; React First Application</p>
      </footer>
    </div>
  );
};

export default Page;
