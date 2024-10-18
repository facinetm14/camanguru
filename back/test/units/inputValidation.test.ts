import { isValidEmail } from "../../src/core/utils/inputValidation/email";
import { isPasswordStrong } from "../../src/core/utils/password";

describe("Input validation test", () => {
  describe.skip("Validate email", () => {
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

  describe("Password complexity rules", () => {
    it("A passwd lenght is min 12 and 20 chars // admin1234", () => {
        expect(isPasswordStrong("admin1234")).toBe(false);
    });

    it("A password should contains one or more capital // adminsdddddd", () => {
      expect(isPasswordStrong("adminsdddddd")).toBe(false);
    });

    it("A passwd should contains one or more digit // adminsdddddZ", () => {
      expect(isPasswordStrong("adminsddddddZ")).toBe(false);
    });

    it("A password should contains one more special chars // adminsddddZ12", () => {
      expect(isPasswordStrong("adminsddddZ12")).toBe(false);
    });

    it("A password should contains one more special chars // adminsddddZ12@#", () => {
      expect(isPasswordStrong("adminsddddZ12@#")).toBe(true);
    });
  });
});
