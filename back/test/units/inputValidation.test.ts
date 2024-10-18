import { isValidEmail } from "../../src/core/utils/inputValidation/email";

describe("Input validation test", () => {
  describe("Validate email", () => {
    it("An email can't start with @ //@invalid-email", () => {
      expect(isValidEmail("@invalid-email")).toBe(false);
    });

    it("An email local part is followed by @ //totodd", () => {
        expect(isValidEmail("totodd")).toBe(false);
    });

    it("The sub-adress is followed by . //test@42", () => {
        expect(isValidEmail('test@42')).toBe(false);
    });
    
    it("This email is valid, should return true //test@42.fr", () => {
        expect(isValidEmail("test@42.fr"));
    })
  });
});
