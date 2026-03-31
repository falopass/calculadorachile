#!/usr/bin/env python3
"""
Script para obtener valores actuales de UF, UTM y Dólar desde la API del BCentral.
Usa la librería bcchapi.

Instalación: pip install bcchapi

Uso:
    python fetch_bcentral_values.py
    python fetch_bcentral_values.py --output json
"""

import argparse
import json
import sys
from datetime import datetime, timedelta

try:
    import bcchapi
except ImportError:
    print("Error: La librería bcchapi no está instalada.")
    print("Instala con: pip install bcchapi")
    sys.exit(1)

# Códigos de series principales
SERIES = {
    "uf": "F022.TAS.CAM.NOM.PRE_UF",
    "utm": "F022.TAS.CAM.NOM.PRE_UTM",
    "dolar_observado": "F073.TIP.CAM.NOM.PRE_DOLAR_OBS",
    "dolar_venta": "F073.TIP.CAM.NOM.PRE_DOLAR_VTA",
}

def load_credentials(cred_file=None):
    """Carga credenciales desde archivo o variables de entorno."""
    if cred_file:
        with open(cred_file, 'r') as f:
            lines = f.read().strip().split('\n')
            return lines[0], lines[1]
    
    # Intentar desde variables de entorno
    import os
    user = os.environ.get('BCENTRAL_USER')
    password = os.environ.get('BCENTRAL_PASS')
    if user and password:
        return user, password
    
    print("Error: No se encontraron credenciales.")
    print("Usa --credentials archivo.txt o configura BCENTRAL_USER y BCENTRAL_PASS")
    sys.exit(1)

def fetch_current_values(user, password):
    """Obtiene los valores actuales de UF, UTM y Dólar."""
    siete = bcchapi.Siete(user, password)
    
    # Fecha desde hace 7 días para asegurar obtener el último valor
    desde = (datetime.now() - timedelta(days=7)).strftime('%Y-%m-%d')
    hasta = datetime.now().strftime('%Y-%m-%d')
    
    results = {}
    
    for name, code in SERIES.items():
        try:
            df = siete.cuadro(
                series=[code],
                nombres=[name],
                desde=desde,
                hasta=hasta,
                observado={name: 'last'}
            )
            
            if df is not None and not df.empty:
                last_value = df[name].dropna().iloc[-1]
                results[name] = float(last_value)
            else:
                results[name] = None
                
        except Exception as e:
            print(f"Error obteniendo {name}: {e}")
            results[name] = None
    
    return results

def main():
    parser = argparse.ArgumentParser(description='Obtener valores del BCentral')
    parser.add_argument('--credentials', '-c', help='Archivo con credenciales (user\\npass)')
    parser.add_argument('--output', '-o', choices=['text', 'json'], default='text',
                        help='Formato de salida')
    args = parser.parse_args()
    
    user, password = load_credentials(args.credentials)
    values = fetch_current_values(user, password)
    
    if args.output == 'json':
        output = {
            'uf': values.get('uf'),
            'utm': values.get('utm'),
            'dolar': {
                'observado': values.get('dolar_observado'),
                'venta': values.get('dolar_venta'),
            },
            'updatedAt': datetime.now().isoformat(),
            'source': 'bcentral',
        }
        print(json.dumps(output, indent=2))
    else:
        print("Valores actuales del Banco Central de Chile:")
        print(f"  UF:            ${values.get('uf', 'N/A'):,.2f}" if values.get('uf') else "  UF:            N/A")
        print(f"  UTM:           ${values.get('utm', 'N/A'):,.0f}" if values.get('utm') else "  UTM:           N/A")
        print(f"  Dólar Obs.:    ${values.get('dolar_observado', 'N/A'):,.2f}" if values.get('dolar_observado') else "  Dólar Obs.:    N/A")
        print(f"  Dólar Venta:   ${values.get('dolar_venta', 'N/A'):,.2f}" if values.get('dolar_venta') else "  Dólar Venta:   N/A")
        print(f"\n  Actualizado:   {datetime.now().strftime('%d/%m/%Y %H:%M')}")

if __name__ == '__main__':
    main()
