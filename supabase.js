async function uploadData(dataUrl, lat, lon) {
  const timestamp = Date.now();
  const fileName = `foto_${timestamp}.jpg`;

  const response = await fetch(dataUrl);
  const blob = await response.blob();

  const { data, error: uploadError } = await supabase.storage
    .from("foto")
    .upload(fileName, blob, {
      contentType: "image/jpeg",
      upsert: false,
    });

  if (uploadError) {
    alert("Upload gagal: " + uploadError.message);
    return;
  }

  const imageUrl = `https://doabniziyspsciwbaqwv.supabase.co/storage/v1/object/public/foto/${fileName}`;

  const { error: dbError } = await supabase.from("pengunjung").insert([
    {
      latitude: lat,
      longitude: lon,
      timestamp: new Date().toISOString(),
      image_url: imageUrl,
    },
  ]);

  if (dbError) {
    alert("Gagal menyimpan ke database: " + dbError.message);
  } else {
    alert("✅ Data berhasil disimpan!");
  }
}
