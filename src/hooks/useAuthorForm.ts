import { useEffect, useState } from "react";
import Author from "../types/author";
import { useParams } from "react-router-dom";
import { getAuthor } from "../services/authorService";

const useAuthorForm = () => {
  const [author, setAuthor] = useState<Author>({
    firstName: "",
    lastName: "",
    birthdate: new Date(),
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (id === "new") {
        return;
      }

      const { data } = await getAuthor(Number(id));
      setAuthor(data);
    };

    fetchData();
  }, []);

  return { author, setAuthor, id };
};

export default useAuthorForm;
