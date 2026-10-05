insert into storage.buckets (id,name,public)
values ('product-images','product-images',true)
on conflict (id) do update set public=true;

create policy "public product images read"
on storage.objects for select
using (bucket_id='product-images');

create policy "admin product images upload"
on storage.objects for insert
with check (bucket_id='product-images' and public.is_admin());

create policy "admin product images update"
on storage.objects for update
using (bucket_id='product-images' and public.is_admin())
with check (bucket_id='product-images' and public.is_admin());

create policy "admin product images delete"
on storage.objects for delete
using (bucket_id='product-images' and public.is_admin());
