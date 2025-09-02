import './UnitToggle.css';

const UnitToggle = ({ units, onUnitChange }) => {
  return (
    <div className="unit-toggle">
      <span className="unit-label">Units:</span>
      <div className="unit-buttons">
        <button
          className={units === 'celsius' ? 'active' : ''}
          onClick={() => onUnitChange('celsius')}
        >
          °C
        </button>
        <button
          className={units === 'fahrenheit' ? 'active' : ''}
          onClick={() => onUnitChange('fahrenheit')}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default UnitToggle;