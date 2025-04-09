// ReportPdfGenerator.js

import React, { useState } from 'react';
import { Button, Modal, Box, IconButton } from '@mui/material';
import { Document, Page, Text, View, StyleSheet, pdf, Image, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Me5Q.ttf"
});


const ReportPdfGenerator = ({ data, user }) => {
  const [open, setOpen] = useState(false);
  const [blobUrl, setBlobUrl] = useState(null);

  const handleOpen = async () => {
    const pdfBlob = await generatePdf();
    const url = URL.createObjectURL(pdfBlob);
    setBlobUrl(url);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (blobUrl) {
      URL.revokeObjectURL(blobUrl);
      setBlobUrl(null);
    }
  };

  const generatePdf = async () => {
    const MyDocument = (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Заголовок */}
          <View style={styles.header}>
    
            <Text style={styles.title}>Звіт ПНС</Text>
          </View>
          {/* Метадані */}
          <View style={styles.metadata}>
            <Text>Час генерації: {new Date().toLocaleString()}</Text>
            <Text>
              Проміжок генерації: 1
            </Text>
            <Text>Користувач: {user?.name || 'Невідомий'}</Text>
          </View>
          {/* Заголовок таблиці */}
          <View style={styles.tableHeader}>
            <Text style={styles.tableCellHeaderNum}>№</Text>
            <Text style={styles.tableCellHeaderName}>Назва</Text>
            <Text style={styles.tableCellHeader}>Мін. значення</Text>
            <Text style={styles.tableCellHeader}>Макс. значення</Text>
            <Text style={styles.tableCellHeader}>Показник за період</Text>
          </View>
          {/* Рядки таблиці */}
          {data.map((row, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCellNum}>{row.PNSNumber}</Text>
              <Text style={styles.tableCellName}>{row.PNSName}</Text>
              <Text style={styles.tableCell}>
                {row.MinReading !== null ? `${row.MinReading} м³` : '—'}
              </Text>
              <Text style={styles.tableCell}>
                {row.MaxReading !== null ? `${row.MaxReading} м³` : '—'}
              </Text>
              <Text style={styles.tableCell}>
                {row.Difference !== null ? `${row.Difference} м³` : '—'}
              </Text>
            </View>
          ))}
        </Page>
      </Document>
    );
    const asPdf = pdf();
    asPdf.updateContainer(MyDocument);
    const blob = await asPdf.toBlob();
    return blob;
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Завантажити звіт
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
    
          </IconButton>
          {/* Прев'ю PDF */}
          {blobUrl && (
            <iframe
              src={blobUrl}
              width="100%"
              height="95%"
              title="PDF Preview"
              style={{ border: 'none' }}
            ></iframe>
          )}
        </Box>
      </Modal>
    </>
  );
};

// Стилі для PDF документа
const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 10,
    fontFamily: 'Roboto',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    flexGrow: 1,
  },
  metadata: {
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '1 solid black',
    paddingBottom: 4,
    marginBottom: 4,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1 solid #ccc',
    paddingVertical: 4,
  },
  tableCellHeaderNum: {
    flex: 0.3,
    fontWeight: 'bold',
  },
  tableCellHeaderName: {
    flex: 2,
    fontWeight: 'bold',
  },
  tableCellHeader: {
    flex: 1,
    fontWeight: 'bold',
  },
  tableCellNum: {
    flex: 0.3,
  },
  tableCellName: {
    flex: 2,
  },
  tableCell: {
    flex: 1,
  },
});

// Стилі для модального вікна
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '95%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflow: 'hidden',
};

export default ReportPdfGenerator;
