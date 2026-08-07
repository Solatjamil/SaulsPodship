#!/bin/bash
for f in api/category_*.ts; do
  # Fix the import of types
  sed -i "s|from './types'|from '../types.js'|g" "$f"
  
  # Change export
  # Extract the variable name
  # Example line: export const category_01: TheologyCategory = {
  varname=$(grep "export const" "$f" | head -1 | cut -d' ' -f3 | cut -d':' -f1)
  
  sed -i "s/export const $varname: TheologyCategory =/const $varname: TheologyCategory =/g" "$f"
  echo "export default $varname;" >> "$f"
done
