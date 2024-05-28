import { HStack, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

type TimestampProps = {
  timestamp: number;
}

const Timestamp: React.FC<TimestampProps> = ({ timestamp }) => {
  const [localTimestamp, setLocalTimestamp] = useState<string | null>(null);

  useEffect(() => {
    const getLocalTimestamp = () => {
      const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
      setLocalTimestamp(date.toLocaleString()); // Set the local timestamp string
    };

    getLocalTimestamp();
  }, [timestamp]);

  return (
    <HStack>
      <Text color={"green"}>Created at: </Text>
      <Text>{localTimestamp}</Text>
    </HStack>
  );
};

export default Timestamp;
