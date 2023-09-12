import { Stack } from '@chakra-ui/react';
import { JobCard } from './job-card';
import { Job } from '@/lib/directus';

type JobListProps = {
  data: Job[];
};

export function JobList(props: JobListProps) {
  const { data } = props;

  return (
    <Stack spacing='4'>
      {data.map((job, index) => (
        <JobCard key={index} data={job} />
      ))}
    </Stack>
  );
}
