import { atom } from "jotai";
import { Customer, OrderEntry } from "./Api";

export const CurrentCustomerAtom = atom<Customer | null>(null);
export const BasketAtom = atom<OrderEntry[]>([]);
