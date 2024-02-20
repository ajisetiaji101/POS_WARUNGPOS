export class RupiahFormatter {
    private readonly formatter: Intl.NumberFormat;
  
    constructor() {
      // Menggunakan konstruktor untuk menetapkan opsi format mata uang
      this.formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      });
    }
  
    format(amount: number | undefined): string {
      // Menggunakan metode format dari objek NumberFormat
      return this.formatter.format(amount);
    }
  }
  