import { Iuser } from "./user.model";

/**
 * Defines the structure for a single social media Post object.
 */
export interface Ipost {
  user: Iuser;
  imageUrl: string;
  caption: string;
  likes: number;
}