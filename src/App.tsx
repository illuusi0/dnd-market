import { useState, ChangeEvent } from "react";
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
import PaidIcon from "@mui/icons-material/Paid";
import { items } from "./data";
import { Item } from "./types";
import { SelectChangeEvent } from "@mui/material/Select";

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const categories = [...new Set(items.map((item) => item.category))];

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  const handleCategoryChange = (e: SelectChangeEvent<string>) =>
    setSelectedCategory(e.target.value);

  const handleSortChange = (e: SelectChangeEvent<string>) =>
    setSortOrder(e.target.value);

  const filteredAndSortedItems = items
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) =>
      selectedCategory ? item.category === selectedCategory : true
    )
    .sort((a, b) => {
      switch (sortOrder) {
        case "asc":
          return a.price - b.price;
        case "desc":
          return b.price - a.price;
        case "nameAsc":
          return a.name.localeCompare(b.name);
        case "nameDesc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  const convertPrice = (price: number) => {
    const gold = Math.floor(price / 100);
    const silver = Math.floor((price % 100) / 10);
    const copper = price % 10;

    return (
      <span>
        {gold > 0 && (
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {gold}
            <PaidIcon fontSize="small" style={{ color: "gold" }} />
          </span>
        )}
        {silver > 0 && (
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {silver}
            <PaidIcon fontSize="small" style={{ color: "silver" }} />
          </span>
        )}
        {copper > 0 && (
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {copper}
            <PaidIcon fontSize="small" style={{ color: "#8B4513" }} />{" "}
          </span>
        )}
      </span>
    );
  };

  const ItemCard = ({ item }: { item: Item }) => (
    <Grid item xs={6} sm={6} md={4}>
      <Card style={{ height: "100%", minWidth: "170px" }}>
        <CardContent>
          <img
            src={
              item.image ||
              "https://www.laser-bulat.ru/upload/medialibrary/735/2lj6sel8ygv8p6j2xj85gplt9ufd5xpn.png"
            }
            alt={item.name}
            style={{
              width: "100%",
              minWidth: "139px",
              height: "150px",
              objectFit: "contain",
            }}
          />
          <Typography fontSize={"16px"} fontWeight={"600"}>
            {item.name}
          </Typography>
          <Typography color="textSecondary" fontSize={"14px"}>
            {item.description}
          </Typography>
          <Typography fontSize={"14px"}>
            Цена: <b>{convertPrice(item.price)}</b>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Container sx={{ position: "absolute", top: 0, left: 0, marginTop: "12px" }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          background: "white",
          zIndex: 1,
          padding: "12px",
        }}
      >
        <TextField
          label="Поиск"
          variant="outlined"
          fullWidth
          onChange={handleSearchChange}
        />
        <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel size="small">Категория</InputLabel>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
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
          <FormControl fullWidth variant="outlined">
            <InputLabel size="small">Сортировка</InputLabel>
            <Select
              value={sortOrder}
              onChange={handleSortChange}
              label="Сортировка"
            >
              <MenuItem value="asc">По возрастанию цены</MenuItem>
              <MenuItem value="desc">По убыванию цены</MenuItem>
              <MenuItem value="nameAsc">По алфавиту (А-Я)</MenuItem>
              <MenuItem value="nameDesc">По алфавиту (Я-А)</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div style={{ marginTop: "138px" }}>
        <Grid
          container
          spacing={2}
          style={{ marginTop: "16px", display: "flex", alignItems: "stretch" }}
        >
          {filteredAndSortedItems.map((item, index) => (
            <ItemCard key={index} item={item} />
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export default App;
