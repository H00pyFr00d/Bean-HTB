import os
import pandas as pd

def select_range(df, max_lat, min_lat, min_lon, max_lon): #selects points within a given range
    new_df = df.drop(df[df.LAT > max_lat].index)
    new_df = new_df.drop(new_df[new_df.LAT < min_lat].index)
    new_df = new_df.drop(new_df[new_df.LON < min_lon].index)
    new_df = new_df.drop(new_df[new_df.LON > max_lon].index)
    return new_df


bins_data = pd.read_csv(os.path.join(os.getcwd(), 'Communal_Bins.csv'))
latlong_data = pd.read_csv(os.path.join(os.getcwd(), 'latlong_data.csv'))

#---------- drop irrelevent columns and merge ------------
latlong_data = latlong_data.drop(latlong_data[latlong_data.THING == 'SV0000000000'].index) #remove wrong values
latlong_data.drop(columns=['ID', 'X', 'Y', 'THING'], inplace=True)
bins_data.drop(columns=['X', 'Y', 'EASTING', 'NORTHING', 'asset_id_code', 'bin_size'], inplace=True) 
bins_data = bins_data.merge(latlong_data, on="OBJECTID") #adds lat/lon data to our df

#--------- clean bin types -----------------------------
bins_data = bins_data.drop(bins_data[bins_data.feature_type_name == "WS: Bottle Bank - Brown"].index)
bins_data = bins_data.drop(bins_data[bins_data.feature_type_name == "WS: Bottle Bank - Clear"].index)
bins_data = bins_data.drop(bins_data[bins_data.feature_type_name == "WS: Can Banks"].index)
bins_data['feature_type_name'].replace({'WS: Chamberlain Bin': 'General waste', 'WS: Communal Bin': 'General waste', 'WS: Food Waste Communal': 'Food waste', 'WS: Paper Bank' : 'Paper recycling', 'WS: Bottle Bank - Mixed' : 'Bottle recycling', 'WS: Packaging' : 'Packaging recycling', 'WS: Book Bank' : 'Book bank', 'WS: Textile Bank' : 'Textile recycling'}, inplace=True)

#--------- filter points by location -----------------
central_data = select_range(bins_data, 55.949, 55.9396, -3.2, -3.18239)
kings_data = select_range(bins_data, 55.928, 55.917, -3.19, -3.1614)

#--------- export to csv ------------------------------
central_data.to_csv('central_data.csv')
kings_data.to_csv('kings_data.csv')
central_points = central_data[["LAT", "LON"]].to_csv('central_points.csv', index=False) #csv files with ONLY the lat/lon co-ords
kings_points = kings_data[["LAT", "LON"]].to_csv('kings_points.csv', index=False)