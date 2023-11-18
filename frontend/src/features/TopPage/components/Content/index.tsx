import { Input } from '@/components/common/Input';
import { Textarea } from '@/components/common/Textarea';

export const Content = () => {
  return (
    <section className="h-full md:min-w-[500px] md:w-2/3">
      <Input
        placeholder="日記のタイトルを入力"
        className="h-14 border-0 text-xl font-bold !ring-0 !ring-offset-0"
        value="Went to a shopping mole with my family"
      />
      <Textarea
        placeholder="日記の本文を入力"
        className="h-[calc(100%-3.5rem)] border-0 !ring-0 !ring-offset-0"
        value={`Last weekend was a special one for our family. We planned a trip to the newly opened Grand Mall, a shopping haven I'd been eager to explore. The excitement was palpable as we drove there, the car filled with the chatter of my two kids, Amy and Jack, speculating about the games and toys they would see.

As we entered the mall, the sheer size of it took our breath away. The first thing we noticed was the grand central atrium, bathed in natural light from the massive skylight above. Each of us had different things on our agenda – my wife, Sarah, was keen on checking out the fashion outlets, I was interested in the bookstores and electronic gadgets, while the kids were itching to get to the gaming zone.

We decided to split up and meet for lunch. Sarah's enthusiasm for the latest fashion trends led her to several boutiques. She was particularly impressed with a small, independent store showcasing sustainable clothing. Meanwhile, I found solace among shelves lined with books and the latest tech gadgets. It was a rare opportunity to browse without a hurry, something I relished deeply.

The kids, unsurprisingly, were having the time of their lives in the gaming arcade. The sound of their laughter and excitement was infectious. They tried various games, from virtual reality experiences to classic arcade basketball. Watching them play with such joy was a delightful sight.

Lunchtime brought us together at the food court. The array of options was staggering, but we settled on a family favorite – Italian. Over pizzas and pasta, we shared our morning experiences, each narrating our little adventures. The kids were bubbling with stories from the arcade, while Sarah showed off a chic scarf she had bought.

Post lunch, we strolled together, exploring various stores. A visit to the pet shop had us all cooing over puppies and kittens. The kids were particularly fascinated by the colorful fish in the aquariums. We also stumbled upon a small art exhibition in the mall, featuring local artists. It was a pleasant surprise, adding a touch of culture to our shopping experience.

As the day progressed, we realized how quickly time had flown. We decided to end our day with some ice cream from a famous parlor in the mall. Sitting there, enjoying our treats, we reflected on the day. It was more than just a shopping trip; it was a day filled with laughter, discovery, and family bonding.

Tired but content, we headed back home. The kids were asleep in the car, exhausted from the day's excitement. Sarah and I shared a quiet, happy smile, knowing that these are the moments that make life beautiful. The day at the mall was not just about shopping; it was about creating memories together, ones that we would cherish for a long time.`}
      />
    </section>
  );
};
