import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";

const HomePage = () => {
  const [search, setSearch] = useState({
    name: "",
  });
  const [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchAction = useRef(
    debounce((e) => {
      setSearch((prev) => ({
        ...prev,
        name: e.target.value,
      }));
    }, 500)
  ).current;

  const fetchPokemon = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v2/pokemon/${search.name}`
      );
      setPokemon(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [search]);

  return (
    <div>
      <nav className="flex">
        <ul className="flex space-x-3">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/form">Form</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <div>
        <h1 className="text-3xl">Pokemon Stats</h1>

        <input
          type="text"
          placeholder="Enter Pokemon Name"
          className="border-2 border-black rounded-md p-2 mt-4"
          onChange={searchAction}
        />

        <button
          className="border-2 border-black transition-all duration-300 ease-out rounded-md p-2 mt-4 ml-2 hover:bg-slate-500"
          onClick={() => fetchPokemon()}
        >
          Search Pokemon
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center text-center mt-6">Loading...</div>
      ) : (
        <div className="flex justify-center">
          <img
            className="w-[200px]"
            src={pokemon?.sprites?.front_default}
            alt=""
          />

          <div className="mt-4">
            <h2 className="text-left font-semibold text-lg">Status</h2>
            {pokemon?.stats?.map((stat, index) => (
              <div className="flex space-x-2" key={index}>
                <p>{stat.stat.name}</p>
                <p>{stat.base_stat}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
