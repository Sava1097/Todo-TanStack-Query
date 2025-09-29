import { createFileRoute } from "@tanstack/react-router";
import { Todos } from "../components/Todos";

export const Route = createFileRoute("/")({
  component: Todos,
});
