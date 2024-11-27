import { useState, useEffect } from "react";

const useProgress = (actividades) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const doneActivitiesCount = actividades.filter(
        (actividad) => actividad.estado === 1
      ).length;

      const totalActivitiesCount = actividades.length;
      const calculatedProgress =
        totalActivitiesCount > 0
          ? Math.round((doneActivitiesCount / totalActivitiesCount) * 100)
          : 0;

      setProgress(calculatedProgress);
    };

    calculateProgress();
  }, [actividades]);

  return progress;
};

export default useProgress;
