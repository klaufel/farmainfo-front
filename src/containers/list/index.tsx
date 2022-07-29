import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Map = dynamic(() => import('../../components/map'), {
  ssr: false,
  suspense: true,
});

import PharmacyCard from '../../components/pharmacyCard';
import Title from '../../components/title';

import usePharmacies from '../../hooks/usePharmacies';

interface ContainerListProps {
  guardDates: GuardDatesType[];
  pharmacies: PharmaciesType[];
  ubication: UbicationType;
}

export default function ContainerList({
  guardDates,
  pharmacies,
  ubication,
}: ContainerListProps) {
  const { municipality } = ubication;

  const { currentDate, pharmaciesList } = usePharmacies({
    guardDates,
    pharmacies,
  });

  return (
    <div className="flex">
      <div className="px-4 sm:px-6 pb-8 sm:pb-12 w-full max-w-content">
        <Title currentDate={currentDate} municipality={municipality} />
        <ul className="grid gap-6 md:grid-cols-2">
          {pharmaciesList?.map(({ id, ...props }) => (
            <li key={id}>
              <PharmacyCard id={id} currentDate={currentDate} {...props} />
            </li>
          ))}
        </ul>
      </div>
      <div
        className="flex-1 sticky hidden sm:block"
        style={{
          top: '5rem',
          height: 'calc(100vh - 5rem)',
          background: '#f7f8f9',
        }}
      >
        <Suspense fallback={null}>
          <Map municipality={municipality} pharmacies={pharmaciesList} />
        </Suspense>
      </div>
    </div>
  );
}