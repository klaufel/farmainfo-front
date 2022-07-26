import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import useMediaQuery from '../../hooks/useMediaQuery';

const Map = dynamic(() => import('../../components/map'), {
  ssr: false,
});

import PharmacyCard from '../../components/pharmacyCard';
import Title from '../../components/title';

import Head from 'next/head';
import useMounted from '../../hooks/useMounted';
import usePharmacies from '../../hooks/usePharmacies';

interface ContainerListProps {
  pharmacies: PharmaciesType[];
  seoPage: SeoPageType;
  ubication: UbicationType;
}

export default function ContainerList({
  pharmacies,
  seoPage,
  ubication,
}: ContainerListProps) {
  const isMounted = useMounted();

  const showMap = useMediaQuery('(min-width: 768px)');

  const { currentDate, pharmaciesList } = usePharmacies({ pharmacies });

  const { municipality } = ubication;
  const { title, description } = seoPage;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
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
          className="flex-1 sticky hidden md:block bg-map"
          style={{ top: '5rem', height: 'calc(100vh - 5rem)' }}
        >
          {isMounted && showMap && (
            <Suspense fallback={null}>
              <Map pharmacies={pharmaciesList} />
            </Suspense>
          )}
        </div>
      </div>
    </>
  );
}
