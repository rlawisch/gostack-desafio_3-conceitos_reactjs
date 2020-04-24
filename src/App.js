import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get("repositories");
      setRepositories(response.data);
    }
    fetchData();
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: `Repo ${Date.now()}`,
    };

    const response = await api.post("repositories", repository);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete("repositories/" + id);

    setRepositories(
      repositories.filter((repository) => repository.id !== id) || []
    );
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <div key={repository.id}>
            <li>{repository.title}</li>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </div>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
