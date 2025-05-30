import { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';

import { Media } from '../../types';
import styles from '../../styles/Cards.module.scss';

const Cards = dynamic(import('./Cards'));
const FeatureCard = dynamic(import('./FeatureCards'));

interface ListProps {
  defaultCard?: boolean;
  heading: string;
  topList?: boolean;
  endpoint: string;
}

export default function List({
  defaultCard = true,
  heading,
  topList = false,
  endpoint
}: ListProps): React.ReactElement {
  const [media, setMedia] = useState<Media[]>([]);

  const getEndpoint = useCallback(async () => {
    try {
      const result = await axios.get(endpoint);
      setMedia(result.data.data);
    } catch (error) {
      console.error(error);
    }
  }, [endpoint]);

  useEffect(() => {
    getEndpoint();
  }, [getEndpoint]);

  return (
    <div className={styles.listContainer}>
      <strong className={styles.category}>{heading}</strong>
      <div className={styles.cardRow}>
        {media?.map((item, index) => {
          if (topList) {
            if (index < 10) {
              return <FeatureCard key={index} index={index + 1} item={item} />;
            }
          } else {
            return (
              <Cards
                key={index}
                defaultCard={defaultCard}
                item={item}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

