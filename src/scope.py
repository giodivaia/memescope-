def scope_2(self, data):
    """
    Calculate Scope 2 emissions from electricity consumption.
    """
    # Initialize total emissions for Scope 2
    total_scope_2 = 0
    
    # Process electricity consumption data
    if 'electricity_consumption' in data:
        for entry in data['electricity_consumption']:
            # Get consumption in kWh and emission factor for the region
            kwh = entry.get('kwh', 0)
            region = entry.get('region', 'default')
            emission_factor = self.get_electricity_emission_factor(region)
            
            # Calculate emissions for this entry
            emissions = kwh * emission_factor
            total_scope_2 += emissions
    
    return total_scope_2

def get_electricity_emission_factor(self, region):
    """
    Get the emission factor for electricity based on region.
    Returns emission factor in kg CO2e per kWh.
    """
    # Example emission factors (these should be updated with actual values)
    emission_factors = {
        'europe': 0.275,
        'north_america': 0.385,
        'asia': 0.463,
        'default': 0.400
    }
    
    return emission_factors.get(region.lower(), emission_factors['default'])
