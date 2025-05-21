import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '@/service/firebaseConfig';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Download, Send } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { WhatsappShareButton, EmailShareButton } from 'react-share';
import { WhatsappIcon, EmailIcon } from 'react-share';

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);
  const tripRef = useRef();
  const shareUrl = `${window.location.origin}/view-trip/${tripId}`;

  useEffect(() => {
    tripId && GetTripData();
    window.scrollTo(0, 0);
  }, [tripId]);

  const GetTripData = async () => {
    const docRef = doc(db, 'AITrips', tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTrip(docSnap.data());
    } else {
      console.log('No Such Document');
      toast('No Trip found');
    }
  };

  const handleDownloadPDF = async () => {
    const input = tripRef.current;
    const canvas = await html2canvas(input, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Trip-${trip?.userSelection?.location?.label || 'Plan'}.pdf`);
  };

  return (
<div ref={tripRef} className="p-10 md:px-20 lg:px-44 xl:56">
      <InfoSection trip={trip} />
      <div className="flex justify-end space-x-4 md:mt-0">
        {/* Social Media Share Buttons */}
        <div className="flex space-x-4">
          <WhatsappShareButton url={shareUrl} title={`Trip to ${trip?.userSelection?.location?.label || 'Plan'}`}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <EmailShareButton subject={`Trip to ${trip?.userSelection?.location?.label || 'Plan'}`} body={shareUrl} >
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
        <Button
          onClick={handleDownloadPDF}
          className="flex items-end bg-gradient-to-r from-teal-500 to-teal-700 text-white px-5 py-2 rounded-full shadow-lg"
        >
          Export
          <Download />
        </Button>
      </div>
      <Hotels trip={trip} />
      <PlacesToVisit trip={trip} />
      <Footer trip={trip} />
    </div>
  );
}

export default ViewTrip;
