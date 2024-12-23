import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import logo from './assets/logo.png'; // Update this path according to your logo location

const styles = StyleSheet.create({
  viewer: {
    width: '100%',
    height: '100vh',
  },
  page: {
    padding: 40,
    fontSize: 12,
    lineHeight: 1.6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    // marginBottom: 20,
  },
  titleRs: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 5,
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  label: {
    width: '25%',
    fontWeight: 'bold',
  },
  value: {
    width: '75%',
  },
  footer: {
    marginTop: 20,
  },
  signature: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align to right
    paddingRight: 40,
  },
  signatureWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 200, // Fixed width for the signature block
  },
  signatureText: {
    marginBottom: 30,
  },
  signatureLine: {
    borderTop: '1px solid black',
    marginTop: 20,
    width: '100%', // Full width of wrapper
  },
});

const MyDocument = ({ rujukanData }) => {
  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        <View style={styles.header}>
          <View>
            <Image src={logo} style={styles.logo} />
          </View>
          <View>
            <Text>No. {rujukanData.no_rujukan || '-'}</Text>
            <Text>Tgl. {formatDate(rujukanData.tanggal)}</Text>
          </View>
        </View>

        {/* Fixed title "SURAT RUJUKAN" and "RS SEHAT" */}
        <Text style={styles.title}>SURAT RUJUKAN</Text>
        <Text style={styles.titleRs}>RS SEHAT</Text>

        {/* Show destination hospital in the address section */}
        <View style={styles.section}>
          <Text>Kepada Yth:</Text>
          <Text style={{ ...styles.bold, marginTop: 5, marginBottom: 5 }}>
            RS {rujukanData.rs_tujuan}
          </Text>
        </View>

        <View style={styles.section}>
          <Text>Mohon Pemeriksaan dan Penanganan Lebih Lanjut:</Text>
        </View>

        <View>
          <View style={styles.fieldRow}>
            <Text style={styles.label}>NIK</Text>
            <Text style={styles.value}>: {rujukanData.no_kartu || '-'}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.label}>Nama Peserta</Text>
            <Text style={styles.value}>
              : {rujukanData.name_patient || '-'} ({rujukanData.gender || '-'})
            </Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.label}>Tgl. Lahir</Text>
            <Text style={styles.value}>
              : {formatDate(rujukanData.birthday_date)}
            </Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.label}>Alamat</Text>
            <Text style={styles.value}>: {rujukanData.address || '-'}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.label}>Diagnosa</Text>
            <Text style={styles.value}>: {rujukanData.diagnosis || '-'}</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.label}>Keterangan</Text>
            <Text style={styles.value}>: {rujukanData.description || '-'}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Demikian atas bantuannya, diucapkan banyak terima kasih.</Text>
        </View>
        <View style={styles.signature}>
          <View style={styles.signatureWrapper}>
            <Text style={styles.signatureText}>Mengetahui,</Text>
            <View style={styles.signatureLine}></View>
            <Text style={{ marginTop: 5 }}>{rujukanData.doctor || '-'}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
