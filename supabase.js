
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://doabniziyspsciwbaqwv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvYWJuaXppeXNwc2Npd2JhcXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMzQ0OTAsImV4cCI6MjA2NTcxMDQ5MH0.EC5zf1Fq5t-YZSk2LmhVOA7PlhissZ664w7ZqGxCu0A';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function uploadData(dataUrl, lat, lon) {
  const fileName = `${Date.now()}.jpg`;
  const response = await fetch(dataUrl);
  const file = await response.blob();

  const { data: storageData, error: uploadError } = await supabase.storage
    .from('1254')
    .upload(fileName, file, { contentType: 'image/jpeg' });

  if (uploadError) {
    alert('Upload gagal: ' + uploadError.message);
    return;
  }

  const imageUrl = `${supabaseUrl}/storage/v1/object/public/1254/${fileName}`;
  const { error: dbError } = await supabase
    .from('pengunjung')
    .insert([{ latitude: lat, longitude: lon, timestamp: new Date().toISOString(), image_url: imageUrl }]);

  if (dbError) {
    alert('Gagal menyimpan ke database: ' + dbError.message);
    return;
  }

  alert("✅ Data berhasil dikirim ke Supabase!");
}
