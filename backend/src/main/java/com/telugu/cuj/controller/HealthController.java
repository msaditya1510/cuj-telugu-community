@RestController
public class HealthController {

    @GetMapping("/")
    public String health() {
        return "CUJ Telugu Community Backend Running";
    }
}