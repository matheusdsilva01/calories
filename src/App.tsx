import { FormEvent, useState } from "react";

import { Autocomplete, Container } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import data from "./util/data.json";

type food = {
  id: number;
  name: string;
  calories: string;
};

function App() {
  const [valueInput, setValueInput] = useState("");
  const [food, setFood] = useState<food>();

  const getCalories = (event: FormEvent) => {
    event.preventDefault();
    const match = data.find(value => value.name === valueInput);
    if (match) setFood(match);
  };
  return (
    <Container sx={{ width: "100%", height: "100vh", display: "flex" }}>
      <FormControl
        component="form"
        sx={{ margin: "auto", display: "flex", gap: 4 }}
        onSubmit={getCalories}
      >
        <Autocomplete
          disablePortal
          getOptionLabel={opt => opt.name}
          onChange={(event, value) => setValueInput(value?.name || "")}
          id="combo-box-demo"
          options={data}
          sx={{ width: 300, margin: "auto", display: "flex" }}
          renderOption={(props, option) => (
            <Box component="li" {...props} key={option.id}>
              {option.name}
            </Box>
          )}
          renderInput={params => (
            <TextField {...params} label="Digite o nome do alimento" />
          )}
        />
        <Button type="submit" variant="contained">
          Procurar...
        </Button>
        <Paper elevation={3} sx={{ padding: "20px" }}>
          {food ? (
            <>
              <Typography>Nome: {food.name}</Typography>
              <Typography>Nº calorias: {food.calories}</Typography>
            </>
          ) : (
            <Typography>Por favor pesquise um alimento a cima</Typography>
          )}
        </Paper>
      </FormControl>
    </Container>
  );
}

export default App;
