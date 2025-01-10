import { useState } from "react";
import {
  Container,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import { items } from "./data";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const categories = [...new Set(items.map((item) => item.category))];

  const filteredItems = items
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) =>
      selectedCategory ? item.category === selectedCategory : true
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  // Функция для конвертации цены
  const convertPrice = (price: number) => {
    const gold = Math.floor(price / 100);
    const silver = Math.floor((price % 100) / 10);
    const copper = price % 10;

    return `${gold > 0 ? `${gold} золотых ` : ''}${silver > 0 ? `${silver} серебряных ` : ''}${copper > 0 ? `${copper} медных` : ''}`.trim();
  };

  return (
    <Container>
      <h2>Поиск предметов</h2>
      <TextField
        label="Поиск по имени"
        variant="outlined"
        fullWidth
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <FormControl fullWidth variant="outlined" style={{ marginTop: "16px" }}>
        <InputLabel>Категория</InputLabel>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          label="Категория"
        >
          <MenuItem value="">
            <em>Все</em>
          </MenuItem>
          {categories.map((category, index) => (
            <MenuItem key={index} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth variant="outlined" style={{ marginTop: "16px" }}>
        <InputLabel>Сортировка по цене</InputLabel>
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          label="Сортировка по цене"
        >
          <MenuItem value="asc">По возрастанию</MenuItem>
          <MenuItem value="desc">По убыванию</MenuItem>
        </Select>
      </FormControl>
      <Grid
        container
        spacing={2}
        style={{ marginTop: "16px", display: "flex", alignItems: "stretch" }}
      >
        {filteredItems.map((item, index) => (
          <Grid item xs={6} sm={6} md={4} key={index}>
            <Card style={{ height: "100%" }}>
              <CardContent>
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100%", height: "150px", objectFit: "cover" }}
                  />
                ) : (
                  <img
                    src="https://www.laser-bulat.ru/upload/medialibrary/735/2lj6sel8ygv8p6j2xj85gplt9ufd5xpn.png"
                    alt="Заглушка"
                    style={{ width: "100%", height: "150px", objectFit: "cover" }}
                  />
                )}
                <Typography variant="h6">{item.name}</Typography>
                <Typography color="textSecondary">
                  {item.description}
                </Typography>
                <Typography variant="body1">Цена: {convertPrice(item.price)}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default App;