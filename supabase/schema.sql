create extension if not exists pgcrypto;

create table if not exists public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 name text,
 phone text,
 district text,
 address text,
 role text not null default 'customer' check (role in ('customer','admin')),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

create table if not exists public.categories (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 image_url text,
 active boolean not null default true,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

create table if not exists public.products (
 id uuid primary key default gen_random_uuid(),
 category_id uuid references public.categories(id) on delete set null,
 name text not null,
 price numeric(12,2) not null default 0,
 discount_price numeric(12,2),
 stock integer not null default 0,
 short_description text,
 description text,
 specifications jsonb default '{}'::jsonb,
 image_url text,
 featured boolean not null default false,
 active boolean not null default true,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

create table if not exists public.product_images (
 id uuid primary key default gen_random_uuid(),
 product_id uuid not null references public.products(id) on delete cascade,
 image_url text not null,
 storage_path text,
 created_at timestamptz not null default now()
);

create table if not exists public.cart (
 id uuid primary key default gen_random_uuid(),
 user_id uuid unique not null references auth.users(id) on delete cascade,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

create table if not exists public.cart_items (
 id uuid primary key default gen_random_uuid(),
 cart_id uuid not null references public.cart(id) on delete cascade,
 product_id uuid not null references public.products(id) on delete cascade,
 quantity integer not null check(quantity > 0),
 unique(cart_id,product_id)
);

create table if not exists public.orders (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id),
 full_name text not null,
 phone text not null,
 email text,
 district text,
 address text not null,
 note text,
 payment_method text not null,
 transaction_id text,
 subtotal numeric(12,2) not null default 0,
 delivery_charge numeric(12,2) not null default 0,
 total numeric(12,2) not null default 0,
 status text not null default 'Pending' check(status in ('Pending','Confirmed','Processing','Shipped','Delivered','Cancelled')),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
 id uuid primary key default gen_random_uuid(),
 order_id uuid not null references public.orders(id) on delete cascade,
 product_id uuid references public.products(id) on delete set null,
 quantity integer not null check(quantity > 0),
 unit_price numeric(12,2) not null
);

create table if not exists public.customer_messages (
 id uuid primary key default gen_random_uuid(),
 user_id uuid references auth.users(id) on delete set null,
 name text not null,
 email text not null,
 phone text,
 message text not null,
 is_read boolean not null default false,
 created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
 id uuid primary key default gen_random_uuid(),
 setting_key text unique not null,
 setting_value text,
 updated_at timestamptz not null default now()
);

insert into public.categories(name) values
('Clothing'),('Electronics'),('Grocery'),('Books'),('Education'),('Home & Lifestyle'),('Others')
on conflict do nothing;
