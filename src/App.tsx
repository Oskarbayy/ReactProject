import { useEffect, useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";

function App() {
  const [showAlert, setShowAlert] = useState(false);
  let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

  const [pets, setPets] = useState<string[]>([]);

  // Exampl e using Fetch API in JavaScript

  useEffect(() => {
    // Now the fetch will only run once, when the component mounts
    fetch("https://biggamesapi.io/api/collection/pets")
      .then((response) => response.json())
      .then((responseJson) => {
        // Ensure responseJson.data is an array
        if (Array.isArray(responseJson.data)) {
          const hugePets = responseJson.data
            .filter((pet: any) => pet.category === "Huge") // This filters out only the pets with category "Huge"
            .map((pet: any) => pet.configName); // Now we map over the filtered list to get an array of configName

          setPets(hugePets);
        } else {
          console.error("Data is not an array:", responseJson.data);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const handleButtonClicked = () => {
    setShowAlert(true);
  };

  const handleCloseClicked = () => {
    setShowAlert(false);
  };

  return (
    <div>
      {showAlert && (
        <Alert onClick={handleCloseClicked}>
          My <span>Alert</span>
        </Alert>
      )}
      <Button color="primary" onClick={handleButtonClicked}>
        My Button
      </Button>

      <ListGroup
        items={pets}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}

export default App;
