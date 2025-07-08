import app from "./app";
import open from "open";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  open(`http://localhost:${PORT}/api-docs`);
});
