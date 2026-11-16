import { useCallback, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function useCarregar(buscar, chave) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const funcao = useRef(buscar);
  funcao.current = buscar;

  const recarregar = useCallback(async () => {
    setCarregando(true);
    setErro("");
    try {
      setDados(await funcao.current());
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      recarregar();
    }, [recarregar, chave])
  );

  return { dados, carregando, erro, recarregar };
}
