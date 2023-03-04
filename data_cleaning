import os
import pandas as pd
import numpy as np

def select_range(df, max_lat, min_lat, min_lon, max_lon): #selects points within a given range
    new_df = df.drop(df[df.LAT > max_lat].index)
    new_df = new_df.drop(new_df[new_df.LAT < min_lat].index)
    new_df = new_df.drop(new_df[new_df.LON < min_lon].index)
    new_df = new_df.drop(new_df[new_df.LON > max_lon].index)
    return new_df


bins_data = pd.read_csv(os.path.join(os.getcwd(), 'Communal_Bins.csv'))
latlong_data = pd.read_csv(os.path.join(os.getcwd(), 'latlong_data.csv'))

latlong_data = latlong_data.drop(latlong_data[latlong_data.THING == 'SV0000000000'].index) #remove wrong values
latlong_data.drop(columns=['ID', 'X', 'Y', 'THING'], inplace=True)
bins_data.drop(columns=['X', 'Y', 'EASTING', 'NORTHING', 'asset_id_code', 'bin_size'], inplace=True) #drop irrelevant columns

bins_data = bins_data.merge(latlong_data, on="OBJECTID") #adds lat/lon data to our df

central_data = select_range(bins_data, 55.949, 55.9396, -3.2, -3.18239)
kings_data = select_range(bins_data, 55.928, 55.917, -3.19, -3.1614)

central_data.to_csv('central_data.csv')
kings_data.to_csv('kings_data.csv')

central_points = central_data[["LAT", "LON"]].to_csv('central_points.csv', index=False)
kings_points = kings_data[["LAT", "LON"]].to_csv('kings_points.csv', index=False)
