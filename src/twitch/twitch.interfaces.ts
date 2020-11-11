export interface TwitchClientCredentials {
  access_token: string;
  expires_in: number;
  scope: string[];
  token_type: string;
}

export interface TwitchStream {
  id: string;
  user_id: string;
  user_name: string;
  game_id: string;
  type: string;
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
  tag_ids?: string[];
}

export interface TwitchGame {
  id: string;
  name: string;
  box_art_url: string;
}
