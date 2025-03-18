import sys
import easyocr

def recognize_plate(image_path):
    reader = easyocr.Reader(['en'])
    result = reader.readtext(image_path)

    plate_number = []
    for detection in result:
        text = detection[1]
        if len(text) > 2:  # Assuming valid plate numbers have at least 3 characters
            text = "".join(char.upper() if char.isalpha() else char for char in text)  # Convert only letters to uppercase
            plate_number.append(text)

    return " ".join(plate_number) if plate_number else "Plate Not Detected"

if __name__ == "__main__":
    image_path = sys.argv[1]
    print(recognize_plate(image_path))