alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.cart enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.customer_messages enable row level security;
alter table public.site_settings enable row level security;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path=public
as $$ select exists(select 1 from public.profiles where id=auth.uid() and role='admin'); $$;

create policy "profiles own read" on public.profiles for select using (id=auth.uid() or public.is_admin());
create policy "profiles own insert" on public.profiles for insert with check (id=auth.uid());
create policy "profiles own update" on public.profiles for update using (id=auth.uid() or public.is_admin()) with check (id=auth.uid() or public.is_admin());

create policy "public active categories" on public.categories for select using (active=true or public.is_admin());
create policy "admin categories" on public.categories for all using (public.is_admin()) with check (public.is_admin());

create policy "public active products" on public.products for select using (active=true or public.is_admin());
create policy "admin products" on public.products for all using (public.is_admin()) with check (public.is_admin());

create policy "public product images" on public.product_images for select using (true);
create policy "admin product images" on public.product_images for all using (public.is_admin()) with check (public.is_admin());

create policy "cart own" on public.cart for all using (user_id=auth.uid() or public.is_admin()) with check (user_id=auth.uid() or public.is_admin());
create policy "cart items own" on public.cart_items for all using (exists(select 1 from public.cart c where c.id=cart_id and (c.user_id=auth.uid() or public.is_admin()))) with check (exists(select 1 from public.cart c where c.id=cart_id and (c.user_id=auth.uid() or public.is_admin())));

create policy "orders own" on public.orders for select using (user_id=auth.uid() or public.is_admin());
create policy "orders customer insert" on public.orders for insert with check (user_id=auth.uid());
create policy "orders admin update" on public.orders for update using (public.is_admin()) with check (public.is_admin());

create policy "order items own" on public.order_items for select using (exists(select 1 from public.orders o where o.id=order_id and (o.user_id=auth.uid() or public.is_admin())));
create policy "order items customer insert" on public.order_items for insert with check (exists(select 1 from public.orders o where o.id=order_id and o.user_id=auth.uid()));
create policy "order items admin all" on public.order_items for all using (public.is_admin()) with check (public.is_admin());

create policy "messages own insert" on public.customer_messages for insert with check (user_id is null or user_id=auth.uid());
create policy "messages own read" on public.customer_messages for select using (user_id=auth.uid() or public.is_admin());
create policy "messages admin update" on public.customer_messages for update using (public.is_admin()) with check (public.is_admin());

create policy "settings public read" on public.site_settings for select using (true);
create policy "settings admin write" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());
