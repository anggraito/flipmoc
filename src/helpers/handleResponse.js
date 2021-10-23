export const handleResponse = (res) => {
  if (!res) showToast('Cek koneksi anda ')
  else if (!res.status) showToast('Terjadi kesalahan pengambilan data')
  else {
      if (res.status == 200 || res.status == 201) null
      else showToast('Terjadi kesalahan pengambilan data')
  }
}