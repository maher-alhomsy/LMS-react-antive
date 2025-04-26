import { CourseType } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react';

const useGetCourses = () => {
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get('get-courses');

        setCourses(data.courses);
      } catch (error: any) {
        console.log('Error in fetch courses');
        console.log(error.message);

        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading, error };
};

export default useGetCourses;
