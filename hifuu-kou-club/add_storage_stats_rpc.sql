-- Create a function to get total storage usage
-- This function accesses the storage.objects table to sum up file sizes
CREATE OR REPLACE FUNCTION get_storage_usage()
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  total_size bigint;
BEGIN
  SELECT SUM((metadata->>'size')::bigint) INTO total_size
  FROM storage.objects;
  
  RETURN coalesce(total_size, 0);
END;
$$;
