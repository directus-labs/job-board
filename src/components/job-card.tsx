import {
  Avatar,
  Box,
  HStack,
  Heading,
  Icon,
  LinkBox,
  LinkOverlay,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import {
  MdBusiness,
  MdLocationPin,
  MdOutlineAttachMoney,
} from 'react-icons/md';
import { Job } from '@/lib/directus';
import { friendlyTime } from '@/lib/friendly-time';

type JobCardProps = {
  data: Job;
};

export function JobCard(props: JobCardProps) {
  const { data, ...rest } = props;
  const {
    id,
    title,
    company,
    location,
    datePosted,
    logo,
    tags,
    remote,
    salaryRange,
  } = data;

  return (
    <Box
      border='1px solid'
      borderColor='gray.300'
      borderRadius='md'
      _hover={{ borderColor: 'black', boxShadow: 'sm' }}
      p='6'
      {...rest}
    >
      <LinkBox as='article'>
        <Stack direction={{ base: 'column', lg: 'row' }} spacing='8'>
          <Avatar size='lg' name={title} src={logo} />
          <Box>
            <LinkOverlay as={NextLink} href={`/${id}`}>
              <Heading size='md'>{title}</Heading>
            </LinkOverlay>
            <Text>{company}</Text>
            <Stack mt='2' spacing={1}>
              <HStack spacing={1}>
                <Icon as={MdLocationPin} boxSize={4} />
                <Text>{location}</Text>
              </HStack>
              <HStack spacing={1}>
                <Icon as={MdBusiness} boxSize={4} />
                <Text>{remote === 'true' ? 'Remote' : 'Onsite'}</Text>
              </HStack>
              <HStack spacing={1}>
                <Icon as={MdOutlineAttachMoney} boxSize={4} />
                <Text>{salaryRange}</Text>
              </HStack>
            </Stack>
          </Box>
          <HStack spacing={2} flex='1'>
            {tags.map((tag, index) => (
              <Tag key={index} colorScheme='gray'>
                {tag}
              </Tag>
            ))}
          </HStack>
          <Text alignSelf={{ base: 'left', lg: 'center' }}>
            Posted {friendlyTime(new Date(datePosted))}
          </Text>
        </Stack>
      </LinkBox>
    </Box>
  );
}
