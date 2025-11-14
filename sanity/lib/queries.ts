import { defineQuery } from "next-sanity";

export const STARTUP_QUERY =
  defineQuery(`*[_type == "startup" && defined(slug.current) && ( !defined($search) || title match $search || category match $search || author->name match $search ) ] | order(_createdAt desc) {
    _id,
    _createdAt,
    title, 
    _type,
    author ->{id, name, bio, slug, image}, 
    category, 
    description, 
    image,
    slug, 
    pitch,
    views
  }`);

export const STARTUP_BY_ID_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id,
  _createdAt,
  title, 
  _type,
  author ->{id, name, username, bio, slug, image}, 
  category, 
  description, 
  image,
  slug, 
  pitch,
  views
}`);

export const STARTUP_VIEWS =
  defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id, views
}`);

export const AUTHOR_BY_GITHUB_ID = defineQuery(`
  *[_type == "author" && id == $id][0]{
    _id,
    id,
    name,
    email,
    username,
    image,bio
  }
  `);
export const AUTHOR_BY_ID_QUERY = defineQuery(`
  *[_type == "author" && _id == $id][0]{
    _id,
    id,
    name,
    email,
    username,
    image,bio
  }
  `);

export const STARTUP_BY_AUTHOR_QUERY =
  defineQuery(`*[_type == "startup" && author_ref == $id | order(_createdAt desc)] {
  _id,
  _createdAt,
  title, 
  _type,
  author ->{id, name, username, bio, slug, image}, 
  category, 
  description, 
  image,
  slug, 
  pitch,
  views
}`);

export const PLAYLIST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }
}`);
